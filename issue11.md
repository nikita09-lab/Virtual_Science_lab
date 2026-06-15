# Feature: Copy to Clipboard for Lab Reports

## Description
In `frontend/src/components/VirtualLabReportPreview.jsx`, students can view their generated lab reports and download them in various formats (PDF, Markdown, DOC). However, they frequently want to just quickly copy and paste their report content into an email, an online forum, or a Google Doc without having to download a file to their local machine first.

**The Improvement:**
A new "Copy to Clipboard" button has been added to the report action bar.

## Proposed Solution
1. Add a `handleCopyToClipboard` function that uses the native `navigator.clipboard.writeText` API to seamlessly copy the generated Markdown representation of the report into the user's system clipboard.
2. Provide immediate UI feedback by changing the button text to "Copied!" for 2 seconds.
3. Integrate the button seamlessly into the existing action bar with distinct styling to make it easily recognizable.

## Status
This feature has been successfully built into `frontend/src/components/VirtualLabReportPreview.jsx`. Students can now copy their entire lab report to their clipboard with a single click.
