const NotFound = () => {
    return (
        <>
        <h1>404</h1>
        <h2>The page you're trying to reach does not exist</h2>
        <button onClick={() => window.location.href = "/"}>Return to home</button>
        </>
    )
}

export default NotFound;