'use client'

export default function Body(props:any) {
    return props.points?.sort((a: any, b: any) => b.amount - a.amount)?.map((address: any, index: number) => 
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {address?.address}
            </th>
            <td className="px-6 py-4">
                {address?.amount}
            </td>
            <td className="px-6 py-4">
                {(props?.btcData?.price && address?.amount && props.bamkPriceSats) ?
                 ('$' + ((address?.amount * props?.bamkPriceSats) / 100000000 * props?.btcData?.price).toFixed(2))
                : '-'}
            </td>
            <td className="px-6 py-4">
                {(address?.amount && props.bamkPriceSats) ?
                    ((address?.amount * props?.bamkPriceSats) / 100000000).toFixed(6)
                : '-'}
            </td>
        </tr> 
    )
}