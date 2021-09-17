package com.im2ag.lapiquette.service;

public class ProductNotAvailable extends IllegalStateException {

    public ProductNotAvailable(String string) {
        super(string);
    }
}
