import React from 'react'
import { useState, useEffect } from "react";
import { registerCustomer } from '../../services/Api';
import { Link } from 'react-router-dom';
export const Register = () => {
    const [formInputs, setFormInputs] = useState({});
    const [alert, setAlert] = useState(false);
    const [status, setStatus] = useState(false);

    const changeInputs = (e) => {
        const { name, value } = e.target;
        return setFormInputs({
            ...formInputs, [name]: value,
        });
    };
    const clickRegister = (e) => {
        e.preventDefault();
        registerCustomer(formInputs)
            .then(() => {
                setAlert("Bạn đã đăng ký tài khoản thành công!");
                setStatus(true);
                return setFormInputs({});
            })
            .catch((error) => {
                if (error.response.data === "email exists")
                    return setAlert("Email đã tồn tại!")
                if (error.response.data === "phone exists")
                    return setAlert("Số điện thoại đã tồn tại!")
                return console.log(error);
            });
    };
    return (
        <>

            <div id="customer">
                {
                    alert && (<div className={`alert ${status ? "alert-success" : "alert-danger"} text-center`}>{alert}</div>)
                }
                <h3 className="text-center">Đăng ký</h3>
                <form method="post">
                    <div className="row">
                        <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
                            <input onChange={changeInputs} placeholder="Họ và tên (bắt buộc)" type="text" name="fullName" className="form-control" required value={formInputs.fullName || ""} />
                        </div>
                        <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                            <input onChange={changeInputs} placeholder="Mật khẩu (bắt buộc)" type="text" name="password" className="form-control" required value={formInputs.password || ""} />
                        </div>
                        <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                            <input onChange={changeInputs} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required value={formInputs.email || ""} />
                        </div>
                        <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
                            <input onChange={changeInputs} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required value={formInputs.phone || ""} />
                        </div>
                        <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                            <input onChange={changeInputs} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" required value={formInputs.address || ""} />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a onClick={clickRegister} href="#">
                            <b>Đăng ký ngay</b>
                        </a>
                    </div>
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <Link to="/">
                            <b>Quay về trang chủ</b>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
