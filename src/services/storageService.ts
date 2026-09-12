import { supabase } from "@/lib/supabase";

const SITE_MEDIA_BUCKET = "site-media";

export const PHOTO_ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const PHOTO_MAX_SIZE_BYTES = 8 * 1024 * 1024;

/** Returns null when the file is acceptable, or a pt-BR error message otherwise. */
export function validatePhotoFile(file: File): string | null {
  if (!PHOTO_ALLOWED_MIME_TYPES.includes(file.type as (typeof PHOTO_ALLOWED_MIME_TYPES)[number])) {
    return "Formato não suportado. Envie apenas JPG, PNG ou WEBP.";
  }
  if (file.size > PHOTO_MAX_SIZE_BYTES) {
    return "Arquivo maior que 8MB.";
  }
  return null;
}

export function titleFromFileName(fileName: string): string {
  return fileName.replace(/\.[^./\\]+$/, "");
}

function sanitizeFileName(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  const name = lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
  const ext = lastDot > 0 ? fileName.slice(lastDot + 1).toLowerCase() : "";
  const slug = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return ext ? `${slug}.${ext}` : slug;
}

export function buildGalleryStoragePath(categoryId: string, file: File): string {
  return `gallery/${categoryId}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
}

export async function uploadToSiteMedia(path: string, file: File): Promise<string> {
  const { error } = await supabase.storage.from(SITE_MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFromSiteMedia(paths: string[]): Promise<void> {
  if (paths.length === 0) return;
  const { error } = await supabase.storage.from(SITE_MEDIA_BUCKET).remove(paths);
  if (error) throw error;
}

export function storagePathFromPublicUrl(url: string): string | null {
  const marker = `/object/public/${SITE_MEDIA_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length);
}
