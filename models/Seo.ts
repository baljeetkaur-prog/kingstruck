import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const seoSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
    },

    metaTitle: {
      type: String,
      required: true,
    },

    metaDescription: {
      type: String,
      required: true,
    },

    metaKeywords: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Seo =
  models.Seo ||
  model("Seo", seoSchema);

export default Seo;