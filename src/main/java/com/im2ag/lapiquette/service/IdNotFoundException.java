package com.im2ag.lapiquette.service;

public class IdNotFoundException extends IllegalArgumentException {

    public IdNotFoundException(String string, Long id) {
        this(string + id);
    }

    public IdNotFoundException(String string) {
        super(string);
    }
}
