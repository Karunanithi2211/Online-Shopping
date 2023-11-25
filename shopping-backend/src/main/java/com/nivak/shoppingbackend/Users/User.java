package com.nivak.shoppingbackend.Users;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Users")
public class User {
    @Id
    private ObjectId id;
    private String role = "user";
    private String firstname;
    private String lastname;
    private int age;
    private String gender;
    private String email;
    private String password;
    private String verificationToken;
    private boolean isVerified;
    private String profilepic;
}
