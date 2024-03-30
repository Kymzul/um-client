import { TCompany, TData, dataJson, setData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { companyName, companyNumber, companySector, companyLocation, companyPBA, companyFRY, ratio_cash,
            ratio_debt,
            title_revenue,
            title_pbt,
            title_assets,
            total_cash,
            total_debt,
            current,
            non_current
        } = await req.json();

        const data: TData = {
            companyName, companyNumber, companySector, companyLocation, companyPBA, companyFRY,
            companyID: "",
            ratio_cash,
            ratio_debt,
            title_revenue,
            title_pbt,
            title_assets,
            total_cash,
            total_debt,
            current,
            non_current
        }
        setData(data)

        return NextResponse.json({ message: 'Successfully', data: data }, { status: 201 });


    } catch (e) {
        console.log(e);
        return NextResponse.json({ 'message': 'Failed', 'data': 'Failed to add data' + e }, { status: 500 })
    }
}
export const GET = async (req: NextRequest, res: NextResponse) => {
    try {


        return NextResponse.json({ message: 'Successfully', data: dataJson }, { status: 201 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ 'message': 'Failed', 'data': 'Failed to add data' + e }, { status: 500 })
    }
}



