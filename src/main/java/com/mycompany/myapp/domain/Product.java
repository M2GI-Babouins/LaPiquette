package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "year")
    private Integer year;

    @Column(name = "region")
    private String region;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private Float price;

    @Column(name = "description")
    private String description;

    @Column(name = "alcohol_per")
    private Float alcoholPer;

    @Column(name = "recommandation")
    private String recommandation;

    @Column(name = "age_limit")
    private Integer ageLimit;

    @Column(name = "temperature")
    private Integer temperature;

    @DecimalMax(value = "1")
    @Column(name = "percent_promo")
    private Float percentPromo;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "url_image")
    private String urlImage;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYear() {
        return this.year;
    }

    public Product year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getRegion() {
        return this.region;
    }

    public Product region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getType() {
        return this.type;
    }

    public Product type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getPrice() {
        return this.price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getAlcoholPer() {
        return this.alcoholPer;
    }

    public Product alcoholPer(Float alcoholPer) {
        this.alcoholPer = alcoholPer;
        return this;
    }

    public void setAlcoholPer(Float alcoholPer) {
        this.alcoholPer = alcoholPer;
    }

    public String getRecommandation() {
        return this.recommandation;
    }

    public Product recommandation(String recommandation) {
        this.recommandation = recommandation;
        return this;
    }

    public void setRecommandation(String recommandation) {
        this.recommandation = recommandation;
    }

    public Integer getAgeLimit() {
        return this.ageLimit;
    }

    public Product ageLimit(Integer ageLimit) {
        this.ageLimit = ageLimit;
        return this;
    }

    public void setAgeLimit(Integer ageLimit) {
        this.ageLimit = ageLimit;
    }

    public Integer getTemperature() {
        return this.temperature;
    }

    public Product temperature(Integer temperature) {
        this.temperature = temperature;
        return this;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public Float getPercentPromo() {
        return this.percentPromo;
    }

    public Product percentPromo(Float percentPromo) {
        this.percentPromo = percentPromo;
        return this;
    }

    public void setPercentPromo(Float percentPromo) {
        this.percentPromo = percentPromo;
    }

    public Integer getStock() {
        return this.stock;
    }

    public Product stock(Integer stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getUrlImage() {
        return this.urlImage;
    }

    public Product urlImage(String urlImage) {
        this.urlImage = urlImage;
        return this;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", year=" + getYear() +
            ", region='" + getRegion() + "'" +
            ", type='" + getType() + "'" +
            ", price=" + getPrice() +
            ", description='" + getDescription() + "'" +
            ", alcoholPer=" + getAlcoholPer() +
            ", recommandation='" + getRecommandation() + "'" +
            ", ageLimit=" + getAgeLimit() +
            ", temperature=" + getTemperature() +
            ", percentPromo=" + getPercentPromo() +
            ", stock=" + getStock() +
            ", urlImage='" + getUrlImage() + "'" +
            "}";
    }
}
