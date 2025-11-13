import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class CRUDController {
  constructor(Model, modelName) {
    this.Model = Model;
    this.modelName = modelName;
  }

  create = asyncHandler(async (req, res) => {
    const { name, ...data } = req.body;
    try {
      const created = await this.Model.create({
        name,
        ...data,
        created_by: req.user?._id,
      });

      if (!created) {
        throw new ApiError(
          500,
          `An unexpected error occurred during ${this.modelName} create. Please try again.`
        );
      }

      return res
        .status(201)
        .json(
          new ApiResponse(201, null, `${this.modelName} created successfully.`)
        );
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json(new ApiResponse(409, null, `${name} already exists.`));
      }
      throw new ApiError(
        500,
        `Unexpected error during ${this.modelName} creation.`
      );
    }
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await this.Model.find({ is_deleted: false });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          `All ${this.modelName}s fetched successfully.`
        )
      );
  });

  update = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const find = await this.Model.findById(id);
      if (find.is_deleted) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, `${this.modelName} not found.`));
      }
      const updated = await this.Model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updated) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, `${this.modelName} not found.`));
      }
      res.json(
        new ApiResponse(200, updated, `${this.modelName} updated successfully.`)
      );
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(409)
          .json(
            new ApiResponse(
              409,
              null,
              `${this.modelName} is already exists with same name.`
            )
          );
      }
      throw new ApiError(
        500,
        `Unexpected error during ${this.modelName} creation.`
      );
    }
  });

  remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const find = await this.Model.findById(id);

    if (!find || find.is_deleted) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, `${this.modelName} not found.`));
    }

    const deleted = await this.Model.findByIdAndUpdate(
      id,
      {
        is_deleted: true,
        deleted_at: new Date(),
      },
      { new: true }
    );

    if (!deleted) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, `${this.modelName} not found.`));
    }

    // Always explicitly set status 200
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, `${this.modelName} deleted successfully.`)
      );
  });
}
