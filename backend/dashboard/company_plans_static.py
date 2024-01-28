def Adamjee_insurance1():
    premium = 2000
    def package_1():
        coverage = int(premium * 40)
        health_package = {
            "Plan_type":"package1",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((25 / 100) * coverage),
            "Hospitalization Room Charges": int((25 / 100) * coverage),
            "Dental and vision care": int((35 / 100) * coverage),
            "Other Medical Expenses": int((15 / 100) * coverage)
            }
        return health_package
    def package_2():
        coverage = int(premium * 35)
        health_package = {
            "Plan_type":"package2",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((10 / 100) * coverage),
            "Surgery": int((15 / 100) * coverage),
            "Dental and vision care": int((30 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
            }
        return health_package
    def package_3():
        coverage = int(premium * 20)
        health_package = {
            "Plan_type":"package3",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((10 / 100) * coverage),
            "Surgery": int((15 / 100) * coverage),
            "Dental and vision care": int((30 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }
        return health_package

    return [package_1(),package_2(),package_3()]




    # if premium >= 32000:


def Jubilee_insurance1():
    premium = 2000
    def package_1():
        coverage = int(premium * 35)
        health_package = {
            "Plan_type":"package1",
            "Total annual Coverage": coverage,
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((25 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Other Medical Expenses": int((25 / 100) * coverage)
        }
        return health_package
    def package_2():
        coverage = int(premium * 40)
        health_package = {
            "Plan_type":"package2",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((15 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Surgery": int((10 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }
        return health_package
    def package_3():
        coverage = int(premium * 55)
        health_package = {
            "Plan_type":"package3",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((15 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Surgery": int((10 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }
        return health_package

    return [package_1(),package_2(),package_3()]



def EFU_insurance1():
    premium = 2000
    def package_1():
        coverage = int(premium * 60)
        health_package = {
            "Plan_type":"package1",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((35 / 100) * coverage),
            "Ambulance Services Expenses": int((15 / 100) * coverage),
            "Hospitalization Room Charges": int((45 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }
        return health_package
    def package_2():
        coverage = int(premium * 35)
        health_package = {
            "Plan_type":"package2",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((15 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Surgery": int((10 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }
        return health_package
    def package_3():
        coverage = int(premium * 25)
        health_package = {
            "Plan_type":"package3",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((35 / 100) * coverage),
            "Ambulance Services Expenses": int((15 / 100) * coverage),
            "Hospitalization Room Charges": int((45 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }
        return health_package

    return [package_1(),package_2(),package_3()]




# def generate_plan(premium):
#     x_result = company_x(premium)
#     y_result = company_y(premium)
#     z_result = company_z(premium)

#     print("Company X:", x_result)
#     print("Company Y:", y_result)
#     print("Company Z:", z_result)


# if __name__ == "__main__":
#     generate_plan(1725.55230)