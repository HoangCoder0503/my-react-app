import React from 'react'
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
export const Pagination = ({ pages }) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {
        total,
        totalPages,
        currentPage,
        next,
        prev,
        hasNext,
        hasPrev
    } = pages;

    const formatUrl = (trang) =>{
        return `/Search?keyword=${searchParams.get("keyword")}&page=${trang}`; // trang là biến đặt tên tùy ý để nhận giá trị của biến item ở dưới vào.
    };

    const clickPage= (e,trang) =>{  // trang là biến đặt tên tùy ý để nhận giá trị của biến item ở dưới vào.
        if(trang==="...") return e.preventDefault();
    };

    const renderPagesHtml = (delta = 2) => {  // Đặt tham số để config đưa bnh trang lân cận hiển thị, đặt tên tùy ý, ban đầu mặc định = 2.
        // mang [1... 3 4 (5) 6 7 ... 10].
        const pagesHtml = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||    // Nếu i là trang đầu.
                i === totalPages ||   // Nếu i là trang cuối.
                i === currentPage ||  // Nếu i là trang hiện hành.
                (i >= left && i <= right)   // Nếu i là trang từ hiện hành - delta đến hiện hành + delta.
            ) {
                pagesHtml.push(i);
            }
            else if(
                i===left - 1 ||
                i===right +1
            ){
                pagesHtml.push("...");
            }
        }
        return pagesHtml;

    }

    return (
        <>
            <ul className="pagination">
                {
                    // hasPrev && giao diện nếu true thì trả về nút trang trước, còn false thì không hiển thị.
                    hasPrev && (<li className="page-item"> 
                        <Link className="page-link" to={formatUrl(prev)}>
                            Trang trước
                        </Link>
                    </li>) 
                }
                {
                    renderPagesHtml().map((item,index) => (
                        // Nếu là trang hiện hành thì hiện màu đỏ, còn không màu trắng
                        <li className={`page-item ${item===currentPage ? "active" : ""}`}> 
                            <Link onClick={(e)=>clickPage(e,item)} className="page-link" to={formatUrl(item)}>
                                {item}
                            </Link>
                        </li>
                    ))
                }

                {   
                    // hasNext && giao diện nếu true thì trả về nút trang sau, còn false thì không hiển thị.
                    hasNext && (<li className="page-item">
                        <Link className="page-link" to={formatUrl(next)}>
                            Trang sau
                        </Link>
                    </li>)
                }
            </ul>
        </>
    )
}
