package com.example.dashboardd

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.util.Date

data class AMVisitResponse(val success: Boolean, val data: List<VisitModel>)

data class VisitModel(val visits: Int, val periodDate: LocalDate, val type: PeriodType, val page: String)

enum class PeriodType {
    LQ, LTM, LM
}

@Document(collection = "visits")
data class DMVisitModel(
    @Id
    val id: ObjectId = ObjectId.get(),
    val visits: Int,
    val perioddate: Date,
    val periodtype: String,
    val page: String
)
