import pool from "../config/database";
import { TypeWorkDate } from "../model/dto/reqCalcPayroll";
import { TypeResCalcPayroll } from "../model/dto/resCalcPayroll";
import { TypeEmployee } from "../model/employee";
import { QueryResult } from "pg";

export const getEmployees = async (
  employeeId?: number
): Promise<TypeEmployee[]> => {
  try {
    let result: QueryResult;
    let query = 'select id, name, cast(base_salary as float) as "baseSalary" from employee';
    if (employeeId) {
        query = `${query} WHERE id = $1`;
        result = await pool.query(query, [employeeId]);
    } else {
        query = `${query} order by name`;
        result = await pool.query(query);
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const calcPayroll = async (
  employeeId: number,
  workDate: TypeWorkDate[]
): Promise<TypeResCalcPayroll> => {
  try {
    // default
    let baseSalary: number = 0;
    let salaryPerHour: number = 0;
    const result: TypeResCalcPayroll = {
        employeeName: "",
        totalNormalHours: 0,
        totalOtHours: 0,
        totalNormalPay: 0,
        totalOtPay: 0,
        totalCompensation: 0
    }

    // Get employee info
    const employee: TypeEmployee[] = await getEmployees(employeeId);
    if (!employee || employee.length === 0) {
        throw new Error("Employee not found.")
    }
    result.employeeName = employee[0].name;
    baseSalary = Number(employee[0].baseSalary);

    // Calculate Payroll
    salaryPerHour = Math.ceil(((baseSalary/30/8) * 100)) / 100; //Round to 2 decimal places
    if (workDate && workDate.length > 0) {
        workDate.forEach((work) => {
            const { day, workHour } = work;
            // Normal
            if (workHour > 0 && workHour <= 8) {
                result.totalNormalHours += workHour;
            // Normal + OT
            } else if (workHour > 0 && workHour > 8) {
                result.totalNormalHours += 8;
                result.totalOtHours += workHour - 8;
            }
        });
    }

    result.totalNormalPay = Math.ceil(((result.totalNormalHours * salaryPerHour) * 100)) / 100;
    if (result.totalNormalPay > baseSalary) {
        result.totalNormalPay = baseSalary;
    }

    result.totalOtPay = Math.ceil(((result.totalOtHours * salaryPerHour * 1.5) * 100)) / 100;
    result.totalCompensation = result.totalNormalPay + result.totalOtPay;

    return result;

  } catch (error) {
    throw error;
  }
};