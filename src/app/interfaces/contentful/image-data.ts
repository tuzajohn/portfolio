export interface ImageData {
    fields: ImageField
}

export interface ImageField {
    description: String,
    title: String,
    file: FileMetada
}

export interface FileMetada {
    contentType: String,
    fileName: String,
    url: String,
}