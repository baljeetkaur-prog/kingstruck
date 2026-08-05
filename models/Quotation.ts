import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const quotationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    company: {
      type: String,
    },

    truck_make: {
      type: String,
      required: true,
    },

    truck_model: {
      type: String,
    },

    service_needed: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    emergency: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation =
  models.Quotation ||
  model("Quotation", quotationSchema);

export default Quotation;