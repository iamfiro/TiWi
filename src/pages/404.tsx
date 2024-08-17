import TemplateNav from "../template/Nav.tsx";

const PageNotFound = () => {
    return (
        <>
            <div>
                <h1>Page Not Found</h1>
                <p>Too Many Requests</p>
            </div>
            <TemplateNav isHome={true} />
        </>
    )
}

export default PageNotFound;