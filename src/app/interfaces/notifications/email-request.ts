export interface EmailRequest {
    from: String | undefined,
    to: String[],
    subject: String | undefined,
    text: String | undefined,
    html: String | undefined
}
