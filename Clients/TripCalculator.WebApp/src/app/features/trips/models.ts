import { IBaseInterface, ITrip, ITripUser } from "src/app/core";
import { IRequest, IRequestUpdate } from "../models";

export interface ITripCreateRequest extends IRequest {
    tripName: string;
    tripStartDate: Date;
    tripEndDate: Date;
    userIds: string[];
}

export interface ITripUpdateRequest extends IRequestUpdate {
    tripName: string;
    tripStartDate: Date;
    tripEndDate: Date;
    userIds: string[];
}

export interface ITripVM extends IBaseInterface {
    dto: ITrip;
    tripUsers: ITripUser[];
}