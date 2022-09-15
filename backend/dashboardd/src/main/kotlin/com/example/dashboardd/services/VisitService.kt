package com.example.dashboardd.services

import com.example.dashboardd.DMVisitModel
import com.example.dashboardd.VisitModel
import com.example.dashboardd.repository.VisitRepo
import org.springframework.stereotype.Service
import java.sql.Date

@Service
class VisitService(private val repo: VisitRepo) {
    fun getAll() = repo.findAll()

    fun createVisit(visits: List<VisitModel>) {
        val visit = visits.map {
            DMVisitModel(
                visits = it.visits,
                perioddate = Date.valueOf(it.periodDate),
                periodtype = it.type.name,
                page = it.page
            )
        }
        repo.saveAll(visit)
    }
}
