import { Request, Response } from "express";
import * as apiService from "../services/apiService";
import { TypeReqCalcPayroll } from "../model/dto/reqCalcPayroll";
import { TypeResCalcPayroll } from "../model/dto/resCalcPayroll";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const result = await apiService.getEmployees();
    res.json(result);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const calcPayroll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { employeeId, workDate }: TypeReqCalcPayroll = req.body;

    const result: TypeResCalcPayroll = await apiService.calcPayroll(
      employeeId,
      workDate,
    );
    res.json(result);
  } catch (error) {
    console.error("Calculate Payroll error:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
