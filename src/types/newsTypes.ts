export type NewsData = {
    _id:string,
    title?:string,
    link?:string,
    description?:string,
    pubDate?:string,
    image_url?:string,
    source_id?:string | undefined,
    source_url?:string,
    country?:string[],
    category?:string[],
    keywords?:string[]
    source_icon?:string
}