package com.nivak.shoppingbackend.Cars;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Cars")
public class Car {
    @Id
    private ObjectId id;
    private String carid;
    private String carcompany;
    private String carname;
    private String type;
    private double price;
    private String pricetag;
    private String description;
    private List<String> images;
    private List<String> specs;
}
