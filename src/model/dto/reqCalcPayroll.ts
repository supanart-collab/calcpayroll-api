export type TypeWorkDate = {
    day: number;
    workHour: number;
}

export type TypeReqCalcPayroll = {
    employeeId: number;
    workDate: TypeWorkDate[];
}