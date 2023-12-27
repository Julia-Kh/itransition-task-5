import { CSVLink } from "react-csv";

export default function Export({ data, headers }) {
    return (
        <CSVLink
            data={data}
            headers={headers}
            filename="data.csv"
            className="hidden"
            target="_blank"
        >Download</CSVLink>
    )
}