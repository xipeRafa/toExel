






export default function DownloadExcelAnexo({dataSet}) {






      const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos=0) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos))

    }





	return(<>
		      <ExcelFile>
                <ExcelSheet dataSet={dataSet} name="Organization" />
            </ExcelFile>
		</>)
}


