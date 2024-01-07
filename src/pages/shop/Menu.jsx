import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card"
import Loading from "../../components/Loading"

const Menu = () => {

    const [menu, setMenu] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sort, setSort] = useState("default")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(3)
    const [err, setErr] = useState(false)

    useEffect(() => {

        const getMenu = async () => {
            try {
                const response = await axios.get("http://localhost:6001/menu")
                setMenu(response.data)
                setFilteredItems(response.data)
                setErr(false)
            } catch (error) {

                error && setErr(true)
            }
        }
        getMenu()

        window.scrollTo(0,0);


    }, [])

    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category)
        setFilteredItems(filtered)
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    const sortHandler = (option) => {
        setSort(option)
        let sortedItems = [...filteredItems]

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name))
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price)
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price)
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems)
        setCurrentPage(1);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="section-container py-24">
            <div className="flex justify-between md:flex-row flex-col items-center">
                <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap py-8">
                    <button onClick={() => filterItems("all")} className={selectedCategory === "all" ? "activeCategory" : null}>همه</button>
                    <button onClick={() => filterItems("rogen")} className={selectedCategory === "rogen" ? "activeCategory" : null}>روگن</button>
                    <button onClick={() => filterItems("italian")} className={selectedCategory === "italian" ? "activeCategory" : null}>ایتالیایی</button>
                    <button onClick={() => filterItems("appetizer")} className={selectedCategory === "appetizer" ? "activeCategory" : null}>سالاد و پیش غذا</button>
                    <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "activeCategory" : null}>نوشیدنی</button>
                </div>

                <div className="md:pb-0 pb-8 md:w-1/4 w-1/2 text-end">
                    <select onChange={(e) => sortHandler(e.target.value)} value={sort} className="select select-bordered w-full max-w-xs">
                        <option value="default">پیشفرض</option>
                        <option value="A-Z">براساس حروف الفبا</option>
                        <option value="Z-A"> برعکس حروف الفبا</option>
                        <option value="low-to-high">از ارزان به گران</option>
                        <option value="high-to-low">از گران به ارزان</option>
                    </select>
                </div>
            </div>
            {err && <Loading />}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {
                    currentItems.map((item) => (
                        <Card key={item.name} data={item} />
                    ))
                }
            </div>
            <div className="flex justify-center flex-wrap my-8" dir="ltr">
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`m-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-orange text-white" : "bg-gray-200"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;