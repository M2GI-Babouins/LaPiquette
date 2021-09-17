package com.im2ag.lapiquette.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "date_purchase")
    private LocalDate datePurchase;

    @Column(name = "basket")
    public Boolean basket;

    @ManyToOne
    @JsonIgnoreProperties(value = { "orders" }, allowSetters = true)
    private Client client;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "product", "order" }, allowSetters = true)
    private Set<OrderLine> orderLines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order id(Long id) {
        this.id = id;
        return this;
    }

    public Float getTotalPrice() {
        return this.totalPrice;
    }

    public Order totalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDate getDatePurchase() {
        return this.datePurchase;
    }

    public Order datePurchase(LocalDate datePurchase) {
        this.datePurchase = datePurchase;
        return this;
    }

    public void setDatePurchase(LocalDate datePurchase) {
        this.datePurchase = datePurchase;
    }

    public Boolean getBasket() {
        return this.basket;
    }

    public Order basket(Boolean basket) {
        this.basket = basket;
        return this;
    }

    public void setBasket(Boolean basket) {
        this.basket = basket;
    }

    public Client getClient() {
        return this.client;
    }

    public Order client(Client client) {
        this.setClient(client);
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<OrderLine> getOrderLines() {
        return this.orderLines;
    }

    public Order orderLines(Set<OrderLine> orderLines) {
        this.setOrderLines(orderLines);
        return this;
    }

    public Order addOrderLine(OrderLine orderLine) {
        this.orderLines.add(orderLine);
        return this;
    }

    public Order removeOrderLine(OrderLine orderLine) {
        this.orderLines.remove(orderLine);
        return this;
    }

    public void setOrderLines(Set<OrderLine> orderLines) {
        if (this.orderLines != null) {
            this.orderLines.forEach(i -> i.setOrder(null));
        }
        if (orderLines != null) {
            orderLines.forEach(i -> i.setOrder(this));
        }
        this.orderLines = orderLines;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", totalPrice=" + getTotalPrice() +
            ", datePurchase='" + getDatePurchase() + "'" +
            ", basket='" + getBasket() + "'" +
            "}";
    }
}
