package com.im2ag.lapiquette;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.im2ag.lapiquette");

        noClasses()
            .that()
            .resideInAnyPackage("com.im2ag.lapiquette.service..")
            .or()
            .resideInAnyPackage("com.im2ag.lapiquette.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.im2ag.lapiquette.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
