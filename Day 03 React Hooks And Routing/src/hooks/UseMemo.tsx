import React, { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

type Column = {
  key: string;
  label: string;
};

type User = {
  id: number;
  name: string;
  role: string;
};

type ProductTableProps = {
  products: Product[];
  columns: Column[];
  config: CSSProperties;
};

const ProductTable = React.memo(function ProductTable({
  products,
  columns,
  config,
}: ProductTableProps) {
  console.log("ProductTable render");
  return (
    <table className="product-table" style={config}>
      <thead>
        <tr>
            {columns.map((column) => (
                <th key = {column.key}> {column.label} </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VND</td>
                <td>{product.inStock? "Còn hàng" : "Hết hàng"}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
});

function calculatePermisstions(user: User) {
    console.log("Calculating permission for user", user.name);
    if(user.role === "admin"){
        return {
            canCreate: true,
            canEdit: true,
            canDelete: true
        }
    }
    return {
        canCreate: false,
        canEdit: false,
        canDelete: false
    }
}

export default function UseMemo() {

    const [keyword, setKeyword] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [sortType, setSortType] = useState("default");
    const [count, setCount] = useState(0);

    const [products] = useState([
        {id: 1, name: "Iphone 14", price: 30000000, inStock: true},
        {id: 2, name: "Samsung Galaxy S23", price: 25000000, inStock: false},
        {id: 3, name: "Xiaomi 13", price: 20000000, inStock: true},
        {id: 4, name: "Oppo Find X5", price: 15000000, inStock: true},
        {id: 5, name: "Vivo X80", price: 10000000, inStock: false},
    ]);

    const [user] = useState({
        id:1,
        name: "John Doe",
        role: "admin"
    })

    const displayedProducts = useMemo(() => {
        console.log("Filtering and sorting products");
        const filteredProducts = products.filter((product) => {
            const matchesKeyword = product.name.toLowerCase().includes(keyword.toLowerCase());
            const matchesStock = onlyInStock ? product.inStock : true;
            return matchesKeyword && matchesStock;
        })

        const sortedProducts = [...filteredProducts];
        if(sortType === "asc"){
            sortedProducts.sort((a, b) => a.price - b.price);
        }
        if(sortType === "desc"){
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        return sortedProducts;
    }, [products, keyword, onlyInStock, sortType]);

    const totalPrice = useMemo(() => {
        console.log("Calculating total price");
        return displayedProducts.reduce((total, product) => total + product.price, 0);
    }, [displayedProducts]);

    const tableConfig = useMemo<CSSProperties>(() => {
        return {
            fontSize: "16px",
            color: "var(--text-h)",
            width: "100%",
            borderCollapse: "collapse",
            margin: "16px 0",
        }
    }, [])

    const columns = useMemo(() => {
        return [
            {
                key: "name",
                label: "Tên sản phẩm"
            },
            {
                key: "price",
                label: "Giá"
            },
            {
                key:"status",
                label: "Trạng thái"
            }
        ]
    }, []);

    const permissions = useMemo(() => {
        return calculatePermisstions(user);
    }, [user]);

    const dashboardTitle = useMemo(() => {
        return (
            <header>
                <h1>Dashboard</h1>
                <p>Xin chào, {user.name}</p>
                <p>Quyền hạn: {permissions.canCreate ? "Admin" : "User"}</p>
            </header>
        )
    }, [user.name, permissions]);

    return (
        <section className="use-memo-demo">
            <h2>useMemo - Danh sách sản phẩm</h2>
            {dashboardTitle}
            <input 
            value={keyword} 
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="....."
            />

            <label>
                <input type="checkbox" checked={onlyInStock} onChange={(event) => setOnlyInStock(event.target.checked)} />
                Chỉ hiển thị sản phẩm có sẵn
            </label>

            <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
            >
                <option value="none">Sắp xếp</option>
                <option value="asc">Giá: Tăng dần</option>
                <option value="desc">Giá: Giảm dần</option>
            </select>

            <div>
                <p>
                    Số sản phẩm hiển thị: {displayedProducts.length}
                </p>
                <p> Tổng giá: {totalPrice.toLocaleString()} VND</p>
            </div>

            {permissions.canCreate && (
                <button>Thêm sản phẩm</button>
            )}
            <ProductTable products={displayedProducts} columns={columns} config={tableConfig} />
            <button onClick={() => setCount(count + 1)}>Click me {count}</button>
        </section>
    )
}

        
