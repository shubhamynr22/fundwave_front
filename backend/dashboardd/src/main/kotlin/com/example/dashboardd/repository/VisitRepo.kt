package com.example.dashboardd.repository

import com.example.dashboardd.DMVisitModel
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface VisitRepo : MongoRepository<DMVisitModel, String>
