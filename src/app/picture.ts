export interface Picture {
  // A dictionary describing the image_set or planet that the response illustrates, completely determined by the structured endpoint.
  resource?: { label: string }[];

  // A boolean reflection of the supplied option. Included in response because of default values.
  concept_tags?: boolean;

  // The title of the image.
  title?: string;

  // Date of image. Included in response because of default values.
  date?: string;

  // The URL of the APOD image or video of the day.
  url?: string;

  // The URL for any high-resolution image for that day. Returned regardless of 'hd' param setting but will be omitted in the response IF it does not exist originally at APOD.
  hdurl?: string;

  // The type of media (data) returned. May either be 'image' or 'video' depending on content.
  media_type?: string;

  // The supplied text explanation of the image.
  explanation?: string;

  // The most relevant concepts within the text explanation. Only supplied if concept_tags is set to True.
  concepts?: { label: string }[];

  // The URL of thumbnail of the video.
  thumbnail_url?: string;

  copyright?: string;

  service_version?: string;

}