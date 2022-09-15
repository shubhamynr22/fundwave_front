package com.example.dashboardd.controller

import com.example.dashboardd.services.CsvService
import com.example.dashboardd.services.VisitService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/visits")
class VisitController(private val visitService: VisitService, private val csvService: CsvService) {

    @GetMapping
    fun getAllVisits() = ResponseEntity.ok(visitService.getAll())

    @PostMapping("/upload")
    fun uploadCsv(@RequestParam("file") file: MultipartFile) {
        val visits = csvService.csvToVisitModel(file.inputStream)
        visitService.createVisit(visits)
        ResponseEntity.ok(visits)
    }
}
