import { func } from "prop-types";


export type TCompany = {
    companyID: string,
    companyName: string,
    companyNumber: string,
    companySector: string,
    companyLocation: string,
    companyPBA: string,
    companyFRY: string
}


export type TData = {
    companyID: string,
    companyName: string,
    companyNumber: string,
    companySector: string,
    companyLocation: string,
    companyPBA: string,
    companyFRY: string,
    ratio_cash: number,
    ratio_debt: number,
    title_revenue: number,
    title_pbt: number,
    title_assets: number
    total_cash: number,
    total_debt: number,
    current: number,
    non_current: number

}

/**
 'ratio': {
                'ratio_cash': ratio_cash,
                'ratio_debt': ratio_debt
            },
            'title': {
                'title_revenue': revenue,
                'title_pbt': profit_before_tax,
                'title_assets': total_assets
            },
 */

export let dataJson: TData | null = null;

export function setData(data: TData) {
    dataJson = data;
}







export interface SectorProps {
    sectorName: string;
    sectorValue: string;
}

export interface LocationProps {
    locationName: string;
    locationValue: string
}

export const listSector: SectorProps[] = [
    {
        sectorName: 'Tech',
        sectorValue: 'tech'
    }, {
        sectorName: 'Convenience Store',
        sectorValue: 'store'
    },
    {
        sectorName: 'Food and Beverages',
        sectorValue: 'fnd'
    }
]

export const listLocation: LocationProps[] = [
    {
        locationName: 'Kuala Lumpur',
        locationValue: 'KL'
    },
    {
        locationName: 'Penang',
        locationValue: 'PNG'
    },
    {
        locationName: 'Johor Bahru',
        locationValue: 'JB'
    }
]


export const listYear = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
];