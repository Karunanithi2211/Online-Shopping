package com.nivak.shoppingbackend.Cars;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;



@Repository("cars")
public interface CarRepository extends MongoRepository<Car,ObjectId> {
    Optional<Car> findByCarid(String carid);
}
