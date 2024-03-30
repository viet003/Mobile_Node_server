import db from "../models"

// get information
export const getInformationService = async ({ userid }) => {
    try {
        const check = await db.info.findOne({ where: { userid } });
        if (check) {
            return check;
        } else {
            return {
                'firstname': '',
                'lastname': '',
                'phone': '',
                'address': '',
                'city': '',
            }
        }
    } catch (error) {
        throw (error)
    }
}


// insert product
export const insertInformationService = async ({ userid, firstname, lastname, phone, address, city }) => {
    try {
        const check = await db.info.findOne({ where: { userid } });
        if (check) {
            try {
                const response = await db.info.update({
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    address: address,
                    city: city
                }, { where: { userid } });
                return ({
                    err: response ? 0 : 2,
                    msg: response ? 'Cập nhật thành công!' : 'Không thành công.',
                    //token: token || null
                });
            } catch (error) {
                throw (error)
            }
        } else {
            const response = await db.info.create({
                userid: userid,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                address: address,
                city: city
            });
            return ({
                err: response ? 0 : 2,
                msg: response ? 'Thêm thành công!' : 'Không thành công.',
                //token: token || null
            });
        }

    } catch (error) {
        throw (error)
    }
}


