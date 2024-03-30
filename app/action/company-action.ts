import { revalidatePath } from "next/cache";

export const validateCompany = async (formData: FormData) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/validate',
            {
                method: 'POST',
                body: formData,
            },
        )
        if (!response.ok) {
            throw new Error(`Failed to upload due to: ${response.statusText}`);
        }
        let result;
        const jsonData = await response.json();
        // Extract ratio and title from jsonData

        const ratio = jsonData.ratio;
        const title = jsonData.title;
        const total = jsonData.total;
        const debt = jsonData.debt;

        // Return the result object
        result = {
            error: null,
            ratio: {
                RatioCash: `${ratio.ratio_cash}`,
                RatioDebt: `${ratio.ratio_debt}`
            },
            title: {
                TitleRevenue: `${title.title_revenue}`,
                TitlePBT: `${title.title_pbt}`,
                TitleAssets: `${title.title_assets}`
            },
            total: {
                TotalCash: `${total.total_cash}`,
                TotalDebt: `${total.total_debt}`
            },
            debt: {
                Current: `${debt.current}`,
                NonCurrent: `${debt.non_current}`
            }
        };



        return result;

    } catch (e: any) {
        return { error: e.message, message: `Failed to upload : ${e}` }
    }
}


export const getListCompany = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/company',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            },
        )
        if (!response.ok) {
            throw new Error(`Failed due to: ${response.statusText}`);
        }
        const jsonData = await response.json();
        return jsonData;

    } catch (e: any) {
        return [];
    }
}


export const getSingleCompany = async (companyID: string) => {
    const response = await fetch(`http://127.0.0.1:8000/company/${companyID}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache'
        },
    )
    if (!response.ok) {
        throw new Error(`Failed due to: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
}

export const addCompany = async (formData: FormData) => {
    const companyName = formData.get('companyName') as string;
    const companyNumber = formData.get('companyNumber') as string;
    const companySector = formData.get('companySector') as string;
    const companyLocation = formData.get('companyLocation') as string;
    const companyPBA = formData.get('companyPBA') as string;
    const companyFRY = formData.get('companyFRY') as string;

    const response = await fetch(`http://127.0.0.1:8000/company`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            companyName,
            companyNumber,
            companySector,
            companyLocation,
            companyPBA,
            companyFRY
        })
    });

    if (!response.ok) {
        throw new Error(`Failed due to: ${response.statusText}`);
    }

    const jsonData = await response.json();
    return jsonData;
};


export const deleteCompany = async (companyID: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/company/${companyID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        });
        let result;

        if (response.ok) {
            result = { error: null, message: `Delete Post` }
        } else {
            const jsonData = await response.json();
            result = { error: jsonData.detail, message: 'Failed to delete' }
        }

        return result;
    } catch (e) {
        const result = { error: e, message: 'Failed to delete' }
        return result;

    }

}




