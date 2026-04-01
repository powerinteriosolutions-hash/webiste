import { Resend } from "resend";
import { NextResponse } from "next/server";
import { company, withAbsoluteBasePathRoute } from "@/lib/site-content";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const sanitizeField = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const buildResponseUrl = (request: Request, status: "success" | "error") =>
  new URL(
    withAbsoluteBasePathRoute(status === "success" ? "/contact/sent" : "/contact/error"),
    request.url,
  );

const getFormFields = async (request: Request): Promise<ContactPayload> => {
  const formData = await request.formData();

  return {
    name: sanitizeField(formData.get("name")),
    phone: sanitizeField(formData.get("phone")),
    email: sanitizeField(formData.get("email")),
    message: sanitizeField(formData.get("message")),
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const fallbackFromEmail = "Power On Interio <onboarding@resend.dev>";

const sendBusinessNotification = async (resend: Resend, from: string, payload: ContactPayload) => {
  const { name, phone, email, message } = payload;
  const subject = `New Power On Interio enquiry${name ? ` from ${name}` : ""}`;
  const text = [
    "New enquiry received from the website.",
    "",
    `Name: ${name}`,
    `Phone: ${phone || "Not provided"}`,
    `Email: ${email}`,
    "",
    "Project details:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f1a17;">
      <h2 style="margin: 0 0 16px;">New enquiry received from the website</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>Project details:</strong></p>
      <p style="white-space: pre-wrap; margin: 0 0 16px;">${escapeHtml(message)}</p>
      <p style="margin: 0; color: #65564a;">Reply-to is set to the sender email so you can respond directly.</p>
    </div>
  `;

  return resend.emails.send({
    from,
    to: [company.email],
    subject,
    text,
    html,
    replyTo: email,
  });
};

const sendClientAcknowledgement = async (resend: Resend, from: string, payload: ContactPayload) => {
  const { name, email } = payload;
  const subject = "Thanks for contacting Power On Interio";
  const greetingName = name || "there";
  const text = [
    `Hi ${greetingName},`,
    "",
    "Thanks for your request.",
    "Our representative will connect with you shortly to understand your requirement.",
    "",
    "Regards,",
    company.name,
    company.phone,
    company.email,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f1a17;">
      <h2 style="margin: 0 0 16px;">Thanks for contacting Power On Interio</h2>
      <p style="margin: 0 0 12px;">Hi ${escapeHtml(greetingName)},</p>
      <p style="margin: 0 0 12px;">Thanks for your request.</p>
      <p style="margin: 0 0 16px;">Our representative will connect with you shortly to understand your requirement.</p>
      <p style="margin: 0;">Regards,</p>
      <p style="margin: 4px 0 0;"><strong>${escapeHtml(company.name)}</strong></p>
      <p style="margin: 4px 0 0;">${escapeHtml(company.phone)}</p>
      <p style="margin: 4px 0 0;">${escapeHtml(company.email)}</p>
    </div>
  `;

  return resend.emails.send({
    from,
    to: [email],
    subject,
    text,
    html,
    replyTo: company.email,
  });
};

const sendWithFallback = async (
  resend: Resend,
  fromCandidates: string[],
  payload: ContactPayload,
  sendEmail: (resend: Resend, from: string, payload: ContactPayload) => Promise<{ error: unknown }>,
  label: string,
) => {
  let lastError: unknown = null;

  for (const from of fromCandidates) {
    const { error } = await sendEmail(resend, from, payload);

    if (!error) {
      return null;
    }

    lastError = error;
    console.error(`Failed to send ${label} email from ${from}.`, error);
  }

  return lastError;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const configuredFromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey) {
    console.error("Resend email configuration is missing.");
    return NextResponse.redirect(buildResponseUrl(request, "error"), { status: 303 });
  }

  const { name, phone, email, message } = await getFormFields(request);

  if (!name || !email || !message) {
    return NextResponse.redirect(buildResponseUrl(request, "error"), { status: 303 });
  }

  const resend = new Resend(apiKey);
  const fromCandidates = Array.from(
    new Set(
      [configuredFromEmail, fallbackFromEmail].filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
      ),
    ),
  );

  const payload = { name, phone, email, message };
  const businessError = await sendWithFallback(
    resend,
    fromCandidates,
    payload,
    sendBusinessNotification,
    "business notification",
  );

  if (businessError) {
    console.error("Failed to send contact form email.", businessError);
    return NextResponse.redirect(buildResponseUrl(request, "error"), { status: 303 });
  }

  const clientError = await sendWithFallback(
    resend,
    fromCandidates,
    payload,
    sendClientAcknowledgement,
    "client acknowledgement",
  );

  if (clientError) {
    console.error(
      "Business enquiry email was sent, but the client acknowledgement email failed.",
      clientError,
    );
  }

  return NextResponse.redirect(buildResponseUrl(request, "success"), { status: 303 });
}
