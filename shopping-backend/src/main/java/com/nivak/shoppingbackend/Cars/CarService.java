package com.nivak.shoppingbackend.Cars;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private void MyMongo(@Qualifier("cars") CarRepository carRepository){
        this.carRepository = carRepository;
    }

    public List<Car> showCars(){
        return carRepository.findAll();
    }

    public Optional<Car> showcarById(String carid){
        return carRepository.findByCarid(carid);
    }
    
}
