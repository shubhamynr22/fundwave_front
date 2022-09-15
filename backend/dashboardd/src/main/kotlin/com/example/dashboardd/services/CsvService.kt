package com.example.dashboardd.services

import com.example.dashboardd.PeriodType
import com.example.dashboardd.VisitModel
import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.time.LocalDate

@Service
class CsvService {
    fun csvToVisitModel(file: InputStream): List<VisitModel> {
        val fileReader = BufferedReader(InputStreamReader(file))
        val csvParser = CSVParser(
            fileReader,
            CSVFormat.DEFAULT.withIgnoreSurroundingSpaces()
        )

        return csvParser.records.drop(1).map {
            VisitModel(
                it[0].toInt(),
                LocalDate.parse(it[1]),
                PeriodType.valueOf(it[2]),
                it[3]
            )
        }
    }
}
