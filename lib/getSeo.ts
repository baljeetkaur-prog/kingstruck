import dbConnect from "@/lib/db";
import Seo from "@/models/Seo";

export default async function getSeo(
  page: string
) {

  await dbConnect();

  const seo = await Seo.findOne({
    page,
  }).lean();

  return seo;

}