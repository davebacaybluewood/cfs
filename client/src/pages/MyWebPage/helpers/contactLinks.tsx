import { FaPhone, FaAddressCard } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'

const contactLinks = (address: string, phoneNumber: string, email: string, licenseNumber: string) => {
    return [
        {
            icon: <HiLocationMarker />,
            text: address
        },
        {
            icon: <FaPhone />,
            text: phoneNumber
        },
        {
            icon: <MdEmail />,
            text: email
        },
        {
            icon: <FaAddressCard />,
            text: licenseNumber
        },
    ]
}

export default contactLinks