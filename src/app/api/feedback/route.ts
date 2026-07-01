import { NextRequest, NextResponse } from "next/server"

/*
 * NRS Feedback Webhook Proxy
 *
 * Set NRS_WEBHOOK_URL in .env.local to either:
 *
 * ── OPTION A: Google Sheets via Google Apps Script ──────────────────────────
 * 1. Go to script.google.com → New project
 * 2. Paste this script (replace YOUR_SHEET_ID):
 *
 *    function doPost(e) {
 *      const data = JSON.parse(e.postData.contents);
 *      const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
 *      sheet.appendRow([
 *        data.submitted_at, data.purpose, data.resolved,
 *        data.wait_time, data.resolution_time, data.visit_count,
 *        data.rating, data.comments
 *      ]);
 *      return ContentService
 *        .createTextOutput(JSON.stringify({ ok: true }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 3. Deploy → New deployment → Web app
 *    Execute as: Me | Who has access: Anyone → Deploy → copy URL
 * 4. Set NRS_WEBHOOK_URL=<paste URL here> in .env.local
 *
 * ── OPTION B: Microsoft Excel via Power Automate ────────────────────────────
 * 1. power.microsoft.com → Create → Automated cloud flow
 * 2. Trigger: "When an HTTP request is received" (set Method: POST)
 * 3. Action: "Add a row into a table" → pick your OneDrive Excel file
 *    Map columns: Timestamp, Purpose, Resolved, Wait Time, Resolution Time, Visit Count, Rating, Comments
 * 4. Save → copy the HTTP POST URL from the trigger step
 * 5. Set NRS_WEBHOOK_URL=<paste URL here> in .env.local
 */

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.NRS_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "NRS_WEBHOOK_URL is not configured" },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "")
      console.error("NRS webhook error:", upstream.status, text)
      return NextResponse.json(
        { error: "Webhook returned an error" },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("NRS webhook fetch failed:", err)
    return NextResponse.json({ error: "Failed to reach webhook" }, { status: 502 })
  }
}
