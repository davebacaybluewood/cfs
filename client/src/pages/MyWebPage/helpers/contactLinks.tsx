import { FaPhone, FaAddressCard, FaLanguage } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'

const contactLinks = (address: string, phoneNumber: string, email: string, licenseNumber: string, languages: string) => {
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
            icon: licenseNumber === '' ? <></> : <FaAddressCard />,
            text: licenseNumber === '' ? '' : licenseNumber
        },
        {
            icon: <FaLanguage />,
            text: languages
        },
    ]
}

export default contactLinks