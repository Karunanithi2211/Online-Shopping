package com.nivak.shoppingbackend.Users;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository("user")
public interface UserRepository extends MongoRepository<User,ObjectId>{
    User findByEmail(String email);
    User findByVerificationToken(String verificationToken);
}
