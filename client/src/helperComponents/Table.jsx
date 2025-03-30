import { Table as BootstrapTable } from "react-bootstrap";

export default function Table({ data }) {
    return (
        <div className="table-responsive width-100">
            <h2 className="text-center">Book List</h2>
            <BootstrapTable striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Publication Year</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.author}</td>
                            <td>{item.description}</td>
                            <td>{item.publication_year}</td>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </BootstrapTable>
        </div>
    );
}
