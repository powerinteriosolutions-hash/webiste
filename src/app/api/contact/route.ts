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
  const subject = `New website enquiry${name ? ` | ${name}` : ""} | ${company.name}`;
  const text = [
    "New website enquiry received.",
    "",
    "Lead details",
    `Name: ${name || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    "",
    "Project brief",
    message || "No project details shared.",
    "",
    "Reply directly to this email to respond to the sender.",
  ].join("\n");

  const html = `
    <div style="margin:0; padding:24px; background:#f6efe6; font-family:Arial, sans-serif; color:#1f1a17;">
      <div style="max-width:720px; margin:0 auto; overflow:hidden; border:1px solid #e4d7c8; border-radius:20px; background:#fffaf4;">
        <div style="padding:24px 28px; background:linear-gradient(135deg,#f3e4d2 0%, #ead8c1 100%); border-bottom:1px solid #e4d7c8;">
          <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.22em; font-weight:700; text-transform:uppercase; color:#9d7145;">
            ${escapeHtml(company.name)}
          </p>
          <h2 style="margin:0; font-size:30px; line-height:1.2; color:#1f1a17;">New website enquiry received</h2>
          <p style="margin:10px 0 0; font-size:15px; line-height:1.7; color:#5f5145;">
            A new lead has been submitted through the website contact form.
          </p>
        </div>

        <div style="padding:28px;">
          <div style="border:1px solid #eadfce; border-radius:16px; background:#ffffff; overflow:hidden;">
            <table role="presentation" style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="width:34%; padding:14px 16px; border-bottom:1px solid #f0e7da; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#9d7145;">Name</td>
                <td style="padding:14px 16px; border-bottom:1px solid #f0e7da; font-size:15px; color:#1f1a17;">${escapeHtml(name || "Not provided")}</td>
              </tr>
              <tr>
                <td style="width:34%; padding:14px 16px; border-bottom:1px solid #f0e7da; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#9d7145;">Phone</td>
                <td style="padding:14px 16px; border-bottom:1px solid #f0e7da; font-size:15px; color:#1f1a17;">${escapeHtml(phone || "Not provided")}</td>
              </tr>
              <tr>
                <td style="width:34%; padding:14px 16px; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#9d7145;">Email</td>
                <td style="padding:14px 16px; font-size:15px; color:#1f1a17;">
                  <a href="mailto:${escapeHtml(email)}" style="color:#1f1a17; text-decoration:none;">${escapeHtml(email || "Not provided")}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-top:20px; border:1px solid #eadfce; border-radius:16px; background:#fffdf9; padding:18px 20px;">
            <p style="margin:0 0 10px; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9d7145;">
              Project Brief
            </p>
            <p style="margin:0; white-space:pre-wrap; font-size:15px; line-height:1.8; color:#3d3128;">${escapeHtml(message || "No project details shared.")}</p>
          </div>

          <p style="margin:18px 0 0; font-size:13px; line-height:1.7; color:#6a5c50;">
            Reply-to is already set to the sender email, so you can respond directly from your inbox.
          </p>
        </div>
      </div>
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
  const { name, phone, email, message } = payload;
  const subject = `We’ve received your enquiry | ${company.name}`;
  const greetingName = name || "there";
  const text = [
    `Hi ${greetingName},`,
    "",
    "Thanks for contacting Power On Interio.",
    "We’ve received your enquiry and our team will review the details shortly.",
    "One of our team members will contact you by phone or email to understand the requirement and guide you on the next step.",
    "",
    `Service coverage: ${company.location}.`,
    "",
    "Your submitted details",
    `Name: ${name || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Project brief: ${message || "No project details shared."}`,
    "",
    "Warm regards,",
    company.name,
    company.phone,
    company.email,
  ].join("\n");

  const html = `
    <div style="margin:0; padding:24px; background:#f6efe6; font-family:Arial, sans-serif; color:#1f1a17;">
      <div style="max-width:720px; margin:0 auto; overflow:hidden; border:1px solid #e4d7c8; border-radius:20px; background:#fffaf4;">
        <div style="padding:24px 28px; background:linear-gradient(135deg,#f3e4d2 0%, #ead8c1 100%); border-bottom:1px solid #e4d7c8;">
          <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.22em; font-weight:700; text-transform:uppercase; color:#9d7145;">
            ${escapeHtml(company.name)}
          </p>
          <h2 style="margin:0; font-size:28px; line-height:1.2; color:#1f1a17;">We’ve received your enquiry</h2>
          <p style="margin:10px 0 0; font-size:15px; line-height:1.7; color:#5f5145;">
            Thank you for reaching out. Our team will review your requirement and connect with you shortly.
          </p>
        </div>

        <div style="padding:28px;">
          <p style="margin:0 0 14px; font-size:16px; line-height:1.8; color:#3d3128;">Hi ${escapeHtml(greetingName)},</p>
          <p style="margin:0 0 12px; font-size:15px; line-height:1.8; color:#3d3128;">
            Thanks for contacting ${escapeHtml(company.name)}. We’ve received your enquiry and a team member will get in touch by phone or email to discuss the scope, timeline, and next steps.
          </p>
          <p style="margin:0 0 18px; font-size:15px; line-height:1.8; color:#3d3128;">
            We handle interior projects across India, including ${escapeHtml(company.location)}.
          </p>

          <div style="border:1px solid #eadfce; border-radius:16px; background:#fffdf9; padding:18px 20px;">
            <p style="margin:0 0 10px; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9d7145;">
              Your Submitted Details
            </p>
            <p style="margin:0 0 8px; font-size:15px; line-height:1.7; color:#3d3128;"><strong>Name:</strong> ${escapeHtml(name || "Not provided")}</p>
            <p style="margin:0 0 8px; font-size:15px; line-height:1.7; color:#3d3128;"><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
            <p style="margin:0 0 8px; font-size:15px; line-height:1.7; color:#3d3128;"><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
            <p style="margin:0; white-space:pre-wrap; font-size:15px; line-height:1.8; color:#3d3128;"><strong>Project brief:</strong> ${escapeHtml(message || "No project details shared.")}</p>
          </div>

          <p style="margin:20px 0 0; font-size:15px; line-height:1.8; color:#3d3128;">Warm regards,</p>
          <p style="margin:4px 0 0; font-size:16px; font-weight:700; color:#1f1a17;">${escapeHtml(company.name)}</p>
          <p style="margin:4px 0 0; font-size:14px; color:#5f5145;">${escapeHtml(company.phone)}</p>
          <p style="margin:4px 0 0; font-size:14px; color:#5f5145;">${escapeHtml(company.email)}</p>
        </div>
      </div>
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
