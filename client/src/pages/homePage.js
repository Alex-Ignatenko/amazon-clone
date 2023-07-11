import data from "../data"


const HomePage = () => {
    return (
        <div className="App">
            <main>
                <h1>Products</h1>
                {
                    data.products.map(product => (
                        <div key={product.token}>
                            <h2>{product.name}</h2>
                            <img alt='' src={product.img} width={200}></img>
                            <p>{product.description}</p>
                        </div>
                    ))
                }
            </main>
        </div>
    )
}

export default HomePage;