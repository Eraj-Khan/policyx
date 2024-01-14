def company_x(premium):
    coverage = int(premium * 40)

    if premium <= 32000:
        health_packages = {
            "Plan_type":"Basic",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((25 / 100) * coverage),
            "Hospitalization Room Charges": int((25 / 100) * coverage),
            "Dental and vision care": int((35 / 100) * coverage),
            "Other Medical Expenses": int((15 / 100) * coverage)
        }

    if premium >= 32000:
        health_packages = {
            "Plan_type":"Premium",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((10 / 100) * coverage),
            "Surgery": int((15 / 100) * coverage),
            "Dental and vision care": int((30 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }

    return health_packages


def company_y(premium):
    coverage = int(premium * 45)

    if premium <= 35000:
        health_packages = {
            "Plan_type":"Basic",
            "Total annual Coverage": coverage,
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((25 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Other Medical Expenses": int((25 / 100) * coverage)
        }

    if premium >= 35000:
        health_packages = {
            "Plan_type":"Premium",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((15 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Surgery": int((10 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }

    return health_packages


def company_z(premium):
    coverage = int(premium * 35)

    if premium <= 45000:
        health_packages = {
            "Plan_type":"Basic",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((35 / 100) * coverage),
            "Ambulance Services Expenses": int((15 / 100) * coverage),
            "Hospitalization Room Charges": int((45 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }

    if premium >= 45000:
        health_packages = {
            "Plan_type":"Premium",
            "Total annual Coverage": coverage,
            "Accidental Emergencies": int((20 / 100) * coverage),
            "Ambulance Services Expenses": int((20 / 100) * coverage),
            "Hospitalization Room Charges": int((15 / 100) * coverage),
            "Routine checkups": int((30 / 100) * coverage),
            "Surgery": int((10 / 100) * coverage),
            "Other Medical Expenses": int((5 / 100) * coverage)
        }

    return health_packages


def generate_plan(premium):
    x_result = company_x(premium)
    y_result = company_y(premium)
    z_result = company_z(premium)

    print("Company X:", x_result)
    print("Company Y:", y_result)
    print("Company Z:", z_result)


if __name__ == "__main__":
    generate_plan(1725.55230)
