package io.github.smart.product.management.dto;

import java.io.Serializable;

public class KeyValueDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Object key;
	private Object value;

	public KeyValueDto() {}

	public KeyValueDto(Object key, Object value) {
		this.key = key;
		this.value = value;
	}

    public Object getKey() {
        return key;
    }

    public void setKey(Object key) {
        this.key = key;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
