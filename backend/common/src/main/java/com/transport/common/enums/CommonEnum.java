package com.transport.common.enums;

import lombok.Getter;

@Getter
public enum CommonEnum {
    Client("Client"),
    Land("Land"),
    Maritime("Maritime");
    private String context;
    CommonEnum(String context) {this.context = context;}
    public String getContext() {return context;}
    public void setContext(String context) {this.context = context;}
}
